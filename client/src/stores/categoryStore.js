let notifiers = new Set();
let buttonId = 'All';

const categoryStore = {
  subscribe(notify) {
    notifiers.add(notify);

    return () => notifiers.delete(notify);
  },

  setId(id) {
    buttonId = id;
    notifiers.forEach(notify => notify());
  },

  getCategory() {
    return buttonId;
  },
};

export default categoryStore;
