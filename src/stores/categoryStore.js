let notifiers = new Set();
let buttonId = '';

const categoryStore = {
  //callback whenever store status changes
  subscribe(notify) {
    notifiers.add(notify);

    return () => notifiers.delete(notify);
  },

  setId(id) {
    buttonId = id;
    notifiers.forEach(notify => notify());
  },

  //return the store status
  getCategory() {
    return buttonId;
  },
};

export default categoryStore;
