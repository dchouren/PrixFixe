import * as commandLineUsage from 'command-line-usage';
import { Section } from 'command-line-usage';
import * as dotenv from 'dotenv';
import * as minimist from 'minimist';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

import { createWorld, World } from '../processors';


import {
    GenericCase,
    LogicalCart,
    LogicalItem,
    ValidationStep,
    // MergedValidationStep,
    CombinedTurn
} from "../test_suite2";
import { printCatalog } from '../repl';

// Holds a single line of an Order with sku instead of key.
export interface SkuLineItem {
    readonly indent: number;
    readonly quantity: number;
    readonly sku: string;
    readonly name: string;
}

interface LegacyCase {
    priority: number;
    suites: string;
    comment: string;
    steps: Array<{
        turns: CombinedTurn[],
        expected: {
            items: SkuLineItem[]
        }
    }>;
}

type LegacySuite = LegacyCase[];

function convertLegacyTestSuiteFile()
{
    dotenv.config();

    const args = minimist(process.argv.slice(2));

    if (args._.length !== 2) {
        showUsage();
        succeed(false);
    }

    const inFile = args._[0];
    const outFile = args._[1];

    let dataPath = process.env.PRIX_FIXE_DATA;
    if (args.d) {
        dataPath = args.d;
    }
    // if (dataPath === undefined) {
    //     const message =
    //         'Use -d flag or PRIX_FIXE_DATA environment variable to specify data path';
    //     return fail(message);
    // }

    console.log('Converting');
    console.log(`  from legacy test suite: ${inFile}`);
    console.log(`  to output file: ${outFile}`);
    console.log(`With data path = ${dataPath}`);
    console.log('');

    // let world: World;
    // try {
    //     world = createWorld(dataPath);
    // } catch (err) {
    //     if (err.code === 'ENOENT' || err.code === 'EISDIR') {
    //         const message = `Error: create world failed: cannot open "${err.path}"`;
    //         return fail(message);
    //     } else {
    //         throw err;
    //     }
    // }

    // Load the legacy test suite.
    let yamlTextIn: string;
    try {
        yamlTextIn = fs.readFileSync(inFile, 'utf8');
    } catch (err) {
        if (err.code === 'ENOENT' || err.code === 'EISDIR') {
            const message = `Error: cannot open ${inFile}`;
            return fail(message);
        } else {
            throw err;
        }
    }

    let legacySuite: LegacySuite;
    try {
        legacySuite = yaml.safeLoad(yamlTextIn) as LegacySuite;
    } catch (err) {
        const message = `Error: invalid yaml in ${inFile}`;
        console.log(JSON.stringify(err, null, 4));
        return fail(message);
    }

    const suite = convertLegacyTestSuite(legacySuite);

    const yamlTextOut = yaml.safeDump(suite);
    fs.writeFileSync(outFile, yamlTextOut, 'utf8');

    console.log('Conversion complete');
    return succeed(true);
}

function showUsage() {
    const program = path.basename(process.argv[1]);

    const usage: Section[] = [
        {
            header: 'Legacy test suite converter',
            content: `This utility converts legacy format test suite YAML files to the format used by test_suite2.`,
        },
        {
            header: 'Usage',
            content: [
                `node ${program} <legacy file> <output file> [...options]`,
            ],
        },
        {
            header: 'Options',
            optionList: [
                {
                    name: 'd',
                    alias: 'd',
                    description: `Path to prix-fixe data files.\n
                - attributes.yaml
                - cookbook.yaml
                - intents.yaml
                - options.yaml
                - products.yaml
                - quantifiers.yaml
                - rules.yaml
                - stopwords.yaml
                - units.yaml\n
                The {bold -d} flag overrides the value specified in the {bold PRIX_FIXE_DATA} environment variable.\n`,
                    type: Boolean,
                },
            ],
        },
    ];

    console.log(commandLineUsage(usage));
}

function convertLegacyTestSuite(
    legacySuite: LegacySuite
): Array<GenericCase<ValidationStep<CombinedTurn>>> {
    const convertLegacyCase = (
        legacy: LegacyCase,
        id: number
    ): GenericCase<ValidationStep<CombinedTurn>> => {
        const steps: Array<ValidationStep<CombinedTurn>> = [];
        for (let i = 0; i < legacy.steps.length; ++i) {
            const cart: LogicalCart = convertLegacyCart(
                legacy.steps[i].expected.items
            );
            steps.push({
                turns: legacy.steps[i].turns,
                cart,
            });
        }

        return {
            id,
            suites: legacy.suites,
            comment: legacy.comment,
            steps,
        };
    };

    return legacySuite.map(convertLegacyCase);
}

function convertLegacyCart(
    legacyItems: SkuLineItem[]
    ): LogicalCart {
    const items: LogicalItem[] = [];
    for (const legacyItem of legacyItems) {

        const item: LogicalItem = {
            quantity: legacyItem.quantity,
            name: legacyItem.name,
            sku: legacyItem.sku,
            children: [],
        };
        if (legacyItem.indent === 0) {
            items.push(item);
        } else {
            items[items.length - 1].children.push(item);
        }
    }

    return { items };
}

function fail(message: string) {
    console.log(' ');
    console.log(message);
    console.log(' ');
    console.log('Use the -h flag for help.');
    console.log(' ');
    console.log('Aborting');
    console.log(' ');
    process.exit(1);
}

function succeed(succeeded: boolean) {
    if (succeeded) {
        process.exit(0);
    } else {
        process.exit(1);
    }
}

function go() {
    convertLegacyTestSuiteFile();
}

go();
