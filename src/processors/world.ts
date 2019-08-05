import * as fs from 'fs';
import * as path from 'path';

import {
    DimensionAndTensorDescription,
    AttributeInfo,
    attributesFromYamlString,
    CartOps,
    Catalog,
    catalogFromYamlString,
    ICartOps,
    ICatalog,
    IRuleChecker,
    loadRuleConfig,
    MENUITEM,
    OPTION,
    RuleChecker,
} from '..';

export interface World {
    attributeInfo: AttributeInfo;
    attributes: DimensionAndTensorDescription;
    cartOps: ICartOps;
    catalog: ICatalog;
    ruleChecker: IRuleChecker;
}

export function createWorld(dataPath: string): World {
    // TODO: should these be path.resolve?
    const productsFile = path.join(dataPath, 'products.yaml');
    const optionsFile = path.join(dataPath, 'options.yaml');
    const attributesFile = path.join(dataPath, 'attributes.yaml');
    const rulesFile = path.join(dataPath, 'rules.yaml');

    const world = setup(productsFile, optionsFile, attributesFile, rulesFile);

    return world;
}

export function setup(
    productsFile: string,
    optionsFile: string,
    attributesFile: string,
    rulesFile: string
): World {
    // Load items from menu data.
    const products = catalogFromYamlString(
        fs.readFileSync(productsFile, 'utf8'),
        MENUITEM
    );
    const options = catalogFromYamlString(
        fs.readFileSync(optionsFile, 'utf8'),
        OPTION
    );
    const catalog = Catalog.fromCatalog(products);
    catalog.merge(options);

    // Create the AttributeInfo instance.
    const attributes = attributesFromYamlString(
        fs.readFileSync(attributesFile, 'utf8')
    );
    const attributeInfo = new AttributeInfo(catalog, attributes);

    const ruleConfig = loadRuleConfig(fs.readFileSync(rulesFile, 'utf8'));
    const ruleChecker: IRuleChecker = new RuleChecker(
        ruleConfig,
        catalog.getGenericMap()
    );

    const cart = new CartOps(attributeInfo, catalog, ruleChecker);

    return {
        attributeInfo,
        attributes,
        cartOps: cart,
        catalog,
        ruleChecker,
    };
}