import {
    CID,
    PID,
    KEY,
} from '../catalog';

export interface QuantityInformation {
    defaultQty: number;
    maxQty: number;
    minQty: number;
}

export interface CatagoryInfo {
    validOptions: PID[];
    qtyInfo: QuantityInformation;
}

export interface CatagoryMap {
    [cid: number]: CatagoryInfo;
}

export interface ExclusionSet {
    [cid: number]: PID[];
}

export interface PartialRule {
    partialKey: KEY;
    validCatagoryMap: CatagoryMap;
    exclusionZones: ExclusionSet;
}

// The shape of the `rule.yaml` file
// TODO: define shape of RuleConfig
export interface RuleConfig {
    rules: PartialRule[];
}
