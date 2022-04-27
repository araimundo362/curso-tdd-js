import Shop from "./Shop";
import Item from "./Item";

describe("At the end of the day", () => {


  const maxQuality = 50;
  const minQuality = 0;
  test("SellIn and Quality values decreases by 1 ", () => {
    const item = regularItem(2,10);
    const shop = aShopWith(item);

    shop.updateQuality();

    expect(item.quality).toBe(9);
    expect(item.sellIn).toBe(1);
    
  });

  test("if SellIn is 0, quality decreases as twice fast and sellIn keep equals", () => {
    const item = expiredRegularItem(10);
    const shop = aShopWith(item);

    shop.updateQuality();

    expect(item.quality).toBe(8);
    expect(item.sellIn).toBe(-1);
  });

  test("the quality of an item is never less than the min quality", () => {
    const item = regularItem(2, minQuality);
    const shop = aShopWith(item);

    shop.updateQuality();

    expect(item.quality).toBe(minQuality);
  });

  test("Aged brie quality values, increases by 1 and sellIn decreases by 1", () => {
    const item = agedBrieItem(3, 6);
    const shop = aShopWith(item);

    shop.updateQuality();

    expect(item.quality).toBe(7);
    expect(item.sellIn).toBe(2);
  });

  test("Aged brie quality is never more than the max quality ", () => {
    const item = agedBrieItem(2, maxQuality);
    const shop = aShopWith(item);

    shop.updateQuality();

    expect(item.quality).toBe(maxQuality);
  });

  test("Sulfuras has never to be sold or decreases quality", () => {
    const item = sulfurasItem(2,10);
    const shop = aShopWith(item);

    shop.updateQuality();

    expect(item.quality).toBe(10);
    expect(item.sellIn).toBe(2);
  });

  test("Bakstage passes, increases in quality as its sellin value approaches", () => {
    const item = backstageItem(20,5);
    const shop = aShopWith(item);

    shop.updateQuality();

    expect(item.quality).toBe(6);
    expect(item.sellIn).toBe(19);
  });

  test("Backstage passes, quality increases by 2 when sellIn is less than 10", () => {
    const item = backstageItem(9,5);
    const shop = aShopWith(item);

    shop.updateQuality();

    expect(item.quality).toBe(7);
    expect(item.sellIn).toBe(8);
  });

  test("Backstage passes, quality increases 3 when sellIn is less than 5", () => {
    const item = backstageItem(3,10);
    const shop = aShopWith(item);

    shop.updateQuality();

    expect(item.quality).toBe(13);
    expect(item.sellIn).toBe(2);
  });

  test("Backstage passes, quality is 0 after the concert", () => {
    const item = backstageItem(-1,10);
    const shop = aShopWith(item);

    shop.updateQuality();

    expect(item.quality).toBe(0);
    expect(item.sellIn).toBe(-2);
  });

  test("aged brie expired, quality increases by 2", () => {
    const item = agedBrieItem(-1, 10);
    const shop = aShopWith(item);

    shop.updateQuality();

    expect(item.quality).toBe(12);
    expect(item.sellIn).toBe(-2);
  })

  test("aged brie expired, when quality increases by 2, quality cant be more than max quality", () => {
    const item = agedBrieItem(-1, 49);
    const shop = aShopWith(item);

    shop.updateQuality();

    expect(item.quality).toBe(maxQuality);
    expect(item.sellIn).toBe(-2);
  })
});

function aShopWith(...items) {
  return new Shop(items)
};

function backstageItem(sellIn, quality) {
  return new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality);
}

function sulfurasItem(sellIn, quality) {
  return new Item("Sulfuras, Hand of Ragnaros", sellIn, quality)
}

function agedBrieItem(sellIn, quality) {
  return new Item("Aged Brie", sellIn, quality);
}

function regularItem(sellIn, quality) {
  return new Item("RegularItem", sellIn, quality);
}

function expiredRegularItem(quality) {
  return regularItem(0, quality);
}
