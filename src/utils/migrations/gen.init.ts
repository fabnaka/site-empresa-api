import { MIGRATION as M_1714416490923 } from "../../migrations/1714416490923";
import { MIGRATION as M_1729184474400 } from "../../migrations/1729184474400";
import { MigrationObject } from "./interfaces";
export function MigrationInit(): MigrationObject {
	return {
		'1714416490923': M_1714416490923,
		'1729184474400': M_1729184474400
	}
}