import Shop from "./Shop";
import Item from "./Item";

const MIN_QUALITY = 0;
const MAX_QUALITY = 50;

test("sellIn decreases every day", () => {
  const item = regularItem(1, 30);
  const shop = new Shop([item]);

  shop.updateQuality();

  expect(item.sellIn).toEqual(0);
});

test("regular items' quality decreases every day", () => {
  const item = regularItem(1, 3);
  const shop = new Shop([item]);

  shop.updateQuality();

  expect(item.quality).toEqual(2);
});

test("expired regular items' quality decreases twice as fast once sellIn has passed", () => {
  const item = regularItem(0, 3);
  const shop = new Shop([item]);

  shop.updateQuality();

  expect(item.quality).toEqual(1);
});

test("regular items' quality never decreases below the minimum quality", () => {
  const item = regularItem(5, 0);
  const shop = new Shop([item]);

  shop.updateQuality();

  expect(item.quality).toEqual(MIN_QUALITY);
});

test("expired regular items' quality never decreases below the minimum quality", () => {
  const item = regularItem(0, 1);
  const shop = new Shop([item]);

  shop.updateQuality();

  expect(item.quality).toEqual(MIN_QUALITY);
});

test("aged brie increases quality by 1", () => {
  const item = agedBrie(5, 8);
  const shop = new Shop([item]);

  shop.updateQuality();

  expect(item.quality).toEqual(9);
});

test("aged brie quality never increases over the maximun quality", () => {
  const item = agedBrie(5, MAX_QUALITY);
  const shop = new Shop([item]);

  shop.updateQuality();

  expect(item.quality).toEqual(MAX_QUALITY);
});

test("expired aged brie quality never increases over the maximun quality", () => {
  const item = agedBrie(0, 49);
  const shop = new Shop([item]);

  shop.updateQuality();

  expect(item.quality).toEqual(MAX_QUALITY);
});

test("expired aged brie increases quality by 2", () => {
  const item = agedBrie(0, 8);
  const shop = new Shop([item]);

  shop.updateQuality();

  expect(item.quality).toEqual(10);
});

test("sulfuras never changes", () => {
  const item = sulfuras(1, 80);
  const shop = new Shop([item]);

  shop.updateQuality();

  expect(item.quality).toEqual(80);
  expect(item.sellIn).toEqual(1);
});

test("backstage increase quality by 1 when sellIn is greater than 10", () => {
  const item = backstagePasses(11, 6);
  const shop = new Shop([item]);

  shop.updateQuality();

  expect(item.quality).toEqual(7);
});

test("backstage increase quality by 2 when sellIn is inside [10, 5)", () => {
  const item1 = backstagePasses(10, 6);
  const item2 = backstagePasses(6, 20);
  const shop = new Shop([item1, item2]);

  shop.updateQuality();

  expect(item1.quality).toEqual(8);
  expect(item2.quality).toEqual(22);
});

test("backstage increase quality by 3 when sellIn is inside [5, 0)", () => {
  const item1 = backstagePasses(5, 6);
  const item2 = backstagePasses(1, 20);
  const shop = new Shop([item1, item2]);

  shop.updateQuality();

  expect(item1.quality).toEqual(9);
  expect(item2.quality).toEqual(23);
});

test("backstage quality drops to 0 after the concert", () => {
  const item = backstagePasses(0, 6);
  const shop = new Shop([item]);

  shop.updateQuality();

  expect(item.quality).toEqual(0);
});

test("backstage quality never increases over the maximun quality when increasing by 1", () => {
  const item = backstagePasses(11, MAX_QUALITY);
  const shop = new Shop([item]);

  shop.updateQuality();

  expect(item.quality).toEqual(MAX_QUALITY);
});

test("backstage quality never increases over the maximun quality when increasing by 2", () => {
  const item = backstagePasses(8, 49);
  const shop = new Shop([item]);

  shop.updateQuality();

  expect(item.quality).toEqual(MAX_QUALITY);
});

test("backstage quality never increases over the maximun quality when increasing by 3", () => {
  const item = backstagePasses(4, 48);
  const shop = new Shop([item]);

  shop.updateQuality();

  expect(item.quality).toEqual(MAX_QUALITY);
});

test("nonsense test to have no surviving mutants and complete coverage", () => {
  const item = sulfuras(-1, 80);
  const shop = new Shop([item]);

  shop.updateQuality();

  expect(item.quality).toEqual(80);
});

function regularItem(sellIn, quality) {
  return new Item("foo", sellIn, quality);
}

function agedBrie(sellIn, quality) {
  return new Item("Aged Brie", sellIn, quality);
}

function sulfuras(sellIn, quality) {
  return new Item("Sulfuras, Hand of Ragnaros", sellIn, quality);
}

function backstagePasses(sellIn, quality) {
  return new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality)
}
/*describe("At the end of the day", () => {


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
*/

