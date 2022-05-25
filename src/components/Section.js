export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  renderItem(data) {
    this._renderer(data);
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
