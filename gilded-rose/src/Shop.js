export default class Shop {
  constructor(someItems) {
    this.items = someItems;
  }

  maxQuality = 50;
  minQuality = 0;

  isAgedBrie(item) {
    return item.name == "Aged Brie";
  }

  isBackstageConcert(item) {
    return item.name == 'Backstage passes to a TAFKAL80ETC concert';
  }

  isSulfuras(item) {
    return item.name == 'Sulfuras, Hand of Ragnaros';
  }
  
  increaseQualityIfPossible(item) {
    if (item.quality < this.maxQuality) {
      item.quality += 1;
    }
  }
  updateItem(item) {
    if (!this.isAgedBrie(item) && !this.isBackstageConcert(item)) {
      if (item.quality > this.minQuality) {
        if (!this.isSulfuras(item)) {
          item.quality -= 1;
        }
      }
    } else {
        this.increaseQualityIfPossible(item);
        if (this.isBackstageConcert(item)) {
          if (item.sellIn < 11) { 
            this.increaseQualityIfPossible(item);
          }
          if (item.sellIn < 6) {
            this.increaseQualityIfPossible(item);
          }
        }
    }
    if (!this.isSulfuras(item)) {
      item.sellIn -= 1;
    }
    if (item.sellIn < this.minQuality) {
      if (!this.isAgedBrie(item)) {
        if (!this.isBackstageConcert(item)) {
          if (item.quality > this.minQuality) {
            if (!this.isSulfuras(item)) {
              item.quality -= 1;
            }
          }
        } else {
          item.quality = 0;
        }
      } else {
        this.increaseQualityIfPossible(item);
      }
    }
  }

  updateQuality() {
    this.items.forEach(item => {
        this.updateItem(item);
      });

      return this.items;
  }

}

