let notifiers = new Set();
let buttonId = 'All';

const filterStore = {
  subscribe(notify) {
    notifiers.add(notify);

    return () => notifiers.delete(notify);
  },

  setId(id) {
    buttonId = id;
    notifiers.forEach(notify => notify());
  },

  getFilter() {
    return buttonId;
  },
};

export default filterStore;
