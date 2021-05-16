import {mount} from '@vue/test-utils';
import SearchTool from '@/components/SearchTool.vue';

describe ('SearchTool.vue', () => {

    it ('renders succesfully', () => {
        const wrapper = mount(SearchTool, {});
        expect(wrapper.html()).toContain('SearchTool');
    });

    describe('When Search was not done', () => {

        let wrapper;

        beforeEach(() => {
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
        
        it('contains an input text', () => {
            expect(wrapper.find('#artistNameInput').exists()).toBe(true);
        });

        it('contains a search button', () => {
            expect(wrapper.find('#searchButton').exists()).toBe(true);
        });

        it('onClick search button will call postData function', async() => {
            const spy = jest.spyOn(wrapper.vm, 'postData')
            await wrapper.find('#searchButton').trigger('click');
            expect(spy).toHaveBeenCalled();
            jest.restoreAllMocks();
        });

    });

    describe('When Search is in progress', () => {

        let wrapper;

        beforeEach(() => {
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

        beforeEach(() => {
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

        beforeEach(() => {
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

        it('when clicking a "Back to Search" button, then "SearchBlock" appears again', async() => {
            const spy = jest.spyOn(wrapper.vm, 'onReturnToSearchClick')
            await wrapper.find('#backToSearchButton').trigger('click');
            expect(spy).toHaveBeenCalled();
            expect(wrapper.vm.result.searchDone).toBe(false);
            expect(wrapper.vm.filterSearch).toMatch('');
            expect(wrapper.vm.posts.artistName).toMatch('');
            jest.restoreAllMocks();
        });

        describe('When not having results', () => {
            
            beforeEach(() => {
                wrapper.vm.result.numberResults = 0;
            });

            beforeEach(() => {
                wrapper.vm.result.numberResults = 0;     
            });

            it('when not having results to show, then grid-container is not rendered', () => {
                expect(wrapper.find('#resultsContainer').exists()).toBe(false);
            });
        });

        describe('When having results', () => {
            
            beforeEach(() => {
                wrapper.vm.result.numberResults = 1;
                wrapper.vm.result.albumData = [{
                    albumTitle: 'Bohemian Rhapsody',
                    albumCover: 'url-undefined'
                }];
            });

            it('when having some result to show, then grid-container is rendered', () => {
                expect(wrapper.find('#resultsContainer').exists()).toBe(true);
            });
        });
    });
});
