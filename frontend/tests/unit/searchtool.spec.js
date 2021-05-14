import {mount} from '@vue/test-utils';
import SearchTool from '@/components/SearchTool.vue';

const context= {
    posts: {
        artistName: 'David Bowie'
    }
  }

const jsonResponse = {
    resultCount: 1,
    results: [
        { collectionName: 'ABC', artworkUrl100: 'http://myUrl'}
    ]
 };

jest.mock('axios', () => ({
    post: jest.fn((_url) => {
        url = _url;
        return Promise.resolve(true);
    })
}));

describe ('SearchTool.vue', () => {

    it ('renders succesfully', () => {
        const wrapper = mount(SearchTool, {});
        expect(wrapper.html()).toContain('SearchTool');
    });

    describe('When Search was not done', () => {

        let wrapper;

        beforeAll(() => {
            wrapper = mount(SearchTool, {});
            wrapper.vm.result.searchDone = false;
            wrapper.vm.result.loading = false;
            wrapper.vm.result.error = false;
        });

        it('contains a Div called searchBlock', () => {
            expect(wrapper.find('#searchBlock').exists()).toBe(true);
        });

        it('does not contain a Div called loadingBlock', () => {
            expect(wrapper.find('#loadingBlock').exists()).toBe(false);
        });

        it('does not contain a Div called errorBlock', () => {
            expect(wrapper.find('#errorBlock').exists()).toBe(false);
        });

        it('does not contain a Div called filterBlock', () => {
            expect(wrapper.find('#filterBlock').exists()).toBe(false);
        });

        it('does not contain a Div called resultsBlock', () => {
            expect(wrapper.find('#resultsBlock').exists()).toBe(false);
        });

        it('contains a form', () => {
            expect(wrapper.find('#searchForm').exists()).toBe(true);
        });
        
        it('contains an input text', () => {
            expect(wrapper.find('#artistNameInput').exists()).toBe(true);
        });

        it('contains a search button', () => {
            expect(wrapper.find('#searchButton').exists()).toBe(true);
        });

    });

    describe('When Search is in progress', () => {

        let wrapper;

        beforeAll(() => {
            wrapper = mount(SearchTool, {});
            wrapper.vm.result.searchDone = false;
            wrapper.vm.result.loading = true;
            wrapper.vm.result.error = false;
        });

        it('contains a Div called searchBlock', () => {
            expect(wrapper.find('#searchBlock').exists()).toBe(true);
        });

        it('contains a Div called loadingBlock', () => {
            expect(wrapper.find('#loadingBlock').exists()).toBe(true);
        });

        it('does not contain a Div called errorBlock', () => {
            expect(wrapper.find('#errorBlock').exists()).toBe(false);
        });

        it('does not contain a Div called filterBlock', () => {
            expect(wrapper.find('#filterBlock').exists()).toBe(false);
        });

        it('does not contain a Div called resultsBlock', () => {
            expect(wrapper.find('#resultsBlock').exists()).toBe(false);
        });
    });

    describe('When Search fails', () => {

        let wrapper;

        beforeAll(() => {
            wrapper = mount(SearchTool, {});
            wrapper.vm.result.searchDone = false;
            wrapper.vm.result.loading = false;
            wrapper.vm.result.error = true;
        });

        it('contains a Div called searchBlock', () => {
            expect(wrapper.find('#searchBlock').exists()).toBe(true);
        });

        it('does not contain a Div called loadingBlock', () => {
            expect(wrapper.find('#loadingBlock').exists()).toBe(false);
        });

        it('contains a Div called errorBlock', () => {
            expect(wrapper.find('#errorBlock').exists()).toBe(true);
        });

        it('does not contain a Div called filterBlock', () => {
            expect(wrapper.find('#filterBlock').exists()).toBe(false);
        });

        it('does not contain a Div called resultsBlock', () => {
            expect(wrapper.find('#resultsBlock').exists()).toBe(false);
        });

    });

    describe('When Search is done', () => {

        let wrapper;

        beforeAll(() => {
            wrapper = mount(SearchTool, {});
            wrapper.vm.result.searchDone = true;
            wrapper.vm.result.loading = false;
            wrapper.vm.result.error = false;
        });

        it('does not contain a Div called searchBlock', () => {
            expect(wrapper.find('#searchBlock').exists()).toBe(false);
        });

        it('does not contain a Div called loadingBlock', () => {
            expect(wrapper.find('#loadingBlock').exists()).toBe(false);
        });

        it('does not contain a Div called errorBlock', () => {
            expect(wrapper.find('#errorBlock').exists()).toBe(false);
        });

        it('contains a Div called filterBlock', () => {
            expect(wrapper.find('#filterBlock').exists()).toBe(true);
        });

        it('contains a Div called resultsBlock', () => {
            expect(wrapper.find('#resultsBlock').exists()).toBe(true);
        });

        it('contains a Div called filterInput', () => {
            expect(wrapper.find('#filterInput').exists()).toBe(true);
        });

        it('contains a "Back to Search" button', () => {
            expect(wrapper.find('#backToSearchButton').exists()).toBe(true);
        });
        
    });

/*
    it ('contains a form', () => {
        const wrapper = mount(SearchTool, {});
        expect(wrapper.html()).toContain('form');
    });

    it ('post a request when search button is pressed', async() => {

        const mockMethod = jest.spyOn(SearchTool.methods, 'postData');
        const wrapper = mount(SearchTool, {});
        expect(wrapper.find('#searchButton').exists()).toBe(true);
        await (wrapper.find('#searchButton')).trigger('click');
        expect(mockMethod).toHaveBeenCalledTimes(1);

    });
    */
});
