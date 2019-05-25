import {
    AID,
    AttributeItem,
    Catalog,
    CID,
    DID,
    Dimension,
    GenericTypedEntity,
    KEY,
    MENUITEM,
    PID,
    SpecificTypedEntity,
    Attributes,
    MatrixDescription,
} from '../../src/';

// A PID that is not indexed in any data structure in this file. For testing
// error cases.
export const unknownPID: PID = 9999;

// A key that is not indexed in any data structure in this file. For testing
// error cases.
export const unknownKey: KEY = '9999:9:9:9';

///////////////////////////////////////////////////////////////////////////////
//
//  Generic product entities for Cones and Coffees
//
///////////////////////////////////////////////////////////////////////////////
export const genericConePID: PID = 8000;
export const coneCID: CID = 100;
export const genericCone: GenericTypedEntity = {
    pid: genericConePID,
    cid: coneCID,
    name: 'cone',
    aliases: ['cone', 'ice cream [cone]'],
    defaultKey: '8000:0:0',
    matrix: 1,
    kind: MENUITEM,
};

export const genericCoffeePID: PID = 9000;
export const coffeeCID: CID = 200;
export const genericcoffee: GenericTypedEntity = {
    pid: genericCoffeePID,
    cid: coffeeCID,
    name: 'coffee',
    aliases: ['coffee'],
    defaultKey: '9000:0:0:0',
    matrix: 2,
    kind: MENUITEM,
};

export const genericItems: GenericTypedEntity[] = [genericCone, genericcoffee];

///////////////////////////////////////////////////////////////////////////////
//
//  Attributes for Sizes, Flavors, Temperatures, and Caffeines
//
///////////////////////////////////////////////////////////////////////////////
export const sizeSmall: AID = 0;
export const sizeMedium: AID = 1;

export const sizes: AttributeItem[] = [
    {
        aid: sizeSmall,
        name: 'small',
        aliases: ['small'],
    },
    {
        aid: sizeMedium,
        name: 'medium',
        aliases: ['medium'],
    },
];

export const flavorVanilla: AID = 2;
export const flavorChocolate: AID = 3;

export const flavors: AttributeItem[] = [
    {
        aid: flavorVanilla,
        name: 'vanilla',
        aliases: ['vanilla'],
    },
    {
        aid: flavorChocolate,
        name: 'chocolate',
        aliases: ['chocolate'],
    },
];

export const temperatureHot: AID = 4;
export const temperatureCold: AID = 5;

export const temperatures: AttributeItem[] = [
    {
        aid: temperatureHot,
        name: 'hot',
        aliases: ['hot'],
    },
    {
        aid: temperatureCold,
        name: 'cold',
        aliases: ['colr', ' iced'],
    },
];

export const caffeineRegular: AID = 6;
export const caffeineDecaf: AID = 7;

export const caffeines: AttributeItem[] = [
    {
        aid: caffeineRegular,
        name: 'regular',
        aliases: ['regular'],
    },
    {
        aid: caffeineDecaf,
        name: 'decaf',
        aliases: ['decaf', 'unleaded'],
    },
];

///////////////////////////////////////////////////////////////////////////////
//
//  Dimension descriptions
//
///////////////////////////////////////////////////////////////////////////////
export const size: DID = 0;
export const flavor: DID = 1;
export const temperature: DID = 2;
export const caffeine: DID = 3;

export const sizeDimensionDescription = {
    did: size,
    name: 'sizes',
    items: sizes,
};

export const flavorDimensionDescription = {
    did: flavor,
    name: 'flavors',
    items: flavors,
};

export const temperatureDimensionDescription = {
    did: temperature,
    name: 'temperatures',
    items: temperatures,
};

export const caffieneDimensionDescription = {
    did: caffeine,
    name: 'caffiene',
    items: caffeines,
};

export const softServeMatrixDescription: MatrixDescription = {
    mid: 1,
    name: 'soft serve',
    dimensions: [size, flavor],
};

export const coffeeMatrixDescription: MatrixDescription = {
    mid: 2,
    name: 'coffee',
    dimensions: [size, temperature, caffeine],
};

///////////////////////////////////////////////////////////////////////////////
//
//  Dimensions
//
///////////////////////////////////////////////////////////////////////////////
export const sizeDimension = new Dimension(size, 'sizes', sizes.values());
export const flavorDimension = new Dimension(
    flavor,
    'flavors',
    flavors.values()
);
export const temperatureDimension = new Dimension(
    temperature,
    'temeperatures',
    temperatures.values()
);
export const caffeineDimension = new Dimension(
    caffeine,
    'caffeines',
    caffeines.values()
);

export const softServeDimensions = [sizeDimension, flavorDimension];
export const coffeeDimensions = [
    sizeDimension,
    temperatureDimension,
    caffeineDimension,
];

///////////////////////////////////////////////////////////////////////////////
//
//  Attributes
//
///////////////////////////////////////////////////////////////////////////////
export const emptyAttributes: Attributes = {
    dimensions: [],
    matrices: [],
};

export const smallWorldAttributes: Attributes = {
    dimensions: [
        sizeDimensionDescription,
        flavorDimensionDescription,
        temperatureDimensionDescription,
        caffieneDimensionDescription,
    ],
    matrices: [softServeMatrixDescription, coffeeMatrixDescription],
};

///////////////////////////////////////////////////////////////////////////////
//
//  Specific Cones (size, flavor)
//
///////////////////////////////////////////////////////////////////////////////
export const smallVanillaCone: SpecificTypedEntity = {
    sku: 8001,
    name: 'small vanilla cone',
    key: '8000:0:0',
    kind: MENUITEM,
};

export const smallChocolateCone: SpecificTypedEntity = {
    sku: 8002,
    name: 'small chocolate cone',
    key: '8000:0:1',
    kind: MENUITEM,
};

export const mediumVanillaCone: SpecificTypedEntity = {
    sku: 8003,
    name: 'medium vanilla cone',
    key: '8000:1:0',
    kind: MENUITEM,
};

export const mediumChocolateCone: SpecificTypedEntity = {
    sku: 8004,
    name: 'medium chocolate cone',
    key: '8000:1:1',
    kind: MENUITEM,
};

///////////////////////////////////////////////////////////////////////////////
//
//  Specific Coffees (size, temperature, caffeine)
//
///////////////////////////////////////////////////////////////////////////////
export const smallcoffee: SpecificTypedEntity = {
    sku: 9001,
    name: 'small coffee',
    key: '9000:0:0:0',
    kind: MENUITEM,
};

export const smallDecafcoffee: SpecificTypedEntity = {
    sku: 9002,
    name: 'small coffee',
    key: '9000:0:0:1',
    kind: MENUITEM,
};

export const smallIcedcoffee: SpecificTypedEntity = {
    sku: 9003,
    name: 'small coffee',
    key: '9000:0:1:0',
    kind: MENUITEM,
};

export const smallIcedDecafcoffee: SpecificTypedEntity = {
    sku: 9004,
    name: 'small coffee',
    key: '9000:0:1:1',
    kind: MENUITEM,
};

export const mediumcoffee: SpecificTypedEntity = {
    sku: 9005,
    name: 'medium coffee',
    key: '9000:1:0:0',
    kind: MENUITEM,
};

export const mediumDecafcoffee: SpecificTypedEntity = {
    sku: 9006,
    name: 'medium decaf coffee',
    key: '9000:1:0:1',
    kind: MENUITEM,
};

export const mediumIcedcoffee: SpecificTypedEntity = {
    sku: 9007,
    name: 'medium iced coffee',
    key: '9000:1:1:0',
    kind: MENUITEM,
};

export const mediumIcedDecafcoffee: SpecificTypedEntity = {
    sku: 9008,
    name: 'medium iced decaf coffee',
    key: '9000:1:1:1',
    kind: MENUITEM,
};

export const specificItems: SpecificTypedEntity[] = [
    smallVanillaCone,
    smallChocolateCone,
    mediumVanillaCone,
    mediumChocolateCone,
    smallcoffee,
    smallDecafcoffee,
    smallIcedcoffee,
    smallIcedDecafcoffee,
    mediumcoffee,
    mediumDecafcoffee,
    mediumIcedcoffee,
    mediumIcedDecafcoffee,
];

///////////////////////////////////////////////////////////////////////////////
//
//  smallWorldCatalog
//
///////////////////////////////////////////////////////////////////////////////
export const smallWorldCatalog = Catalog.fromEntities(
    genericItems.values(),
    specificItems.values()
);