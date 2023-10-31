let notifiers = new Set();
let searchResult = '';

const searchResultStore = {
  subscribe(notify) {
    notifiers.add(notify);

    return () => notifiers.delete(notify);
  },

  setResult(text) {
    searchResult = text;
    notifiers.forEach(notify => notify());
  },

  getResult() {
    return searchResult;
  },
};

export default searchResultStore;
