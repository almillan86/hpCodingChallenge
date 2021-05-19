// ===============================================================================
// TASKS done in the refactored code:
// ===============================================================================
// 1) Require models and superagent API
// 2) Change "var" for "const"
// 3) Re-order if-condition to handle errors first. If not, happy path
// 4) Handle invitationResponse.status with value different than 200 and 201
// 5) Use async/await with exec statement
// 6) Handle the main code in a try-catch to keep a clean handling of errors
// ===============================================================================


const superagent = require('superagent');
const User = require('./models/User');
const Shop = require('./models/Shop');

exports.inviteUser = async function(req, res) {
    const invitationBody = req.body;
    const shopId = req.params.shopId;
    const authUrl = "https://url.to.auth.system.com/invitation";

    superagent
        .post(authUrl)
        .send(invitationBody)
        .end(async function(err, invitationResponse) {

            // Error handling 
            if (invitationResponse.status === 200) {
                res.status(400).json({
                    error: true,
                    message: 'User already invited to this shop'
                });
                return;
            }

            if (invitationResponse.status !== 201)
            {
                res.status(500).json({
                    error: true,
                    message: 'Error unknown with code: ' + invitationResponse.status
                });
                return;    
            }

            // Happy path
            const filter = {authId: invitationResponse.body.authId}; //< Define authId in schema as unique
            const update = {email: invitationBody.email};
            const options = {upsert: true, new: true};

            try {
                
                let updatedUser = await User.findOneAndUpdate(filter, update, options).exec();
                let shop = await Shop.findById(shopId).exec();
                
                if (!shop) {
                    return res.status(500).send({ message: 'No shop found' });
                }
                else {
                    if (shop.invitations.indexOf(invitationResponse.body.invitationId) === -1) {
                        shop.invitations.push(invitationResponse.body.invitationId);
                    }
                    
                    if (shop.users.indexOf(updatedUser._id) === -1) {
                        shop.users.push(updatedUser);
                    }
                    await shop.save();
                }
                
                res.status(201).json(invitationResponse);

            } catch(err) {
                return res.status(500).send(err);
            }
        });
};