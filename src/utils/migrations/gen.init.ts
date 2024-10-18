import { MIGRATION as M_1714416490923 } from "../../migrations/1714416490923";
import { MIGRATION as M_1729184474400 } from "../../migrations/1729184474400";
import { MIGRATION as M_1729268224296 } from "../../migrations/1729268224296";
import { MigrationObject } from "./interfaces";
export function MigrationInit(): MigrationObject {
	return {
		'1714416490923': M_1714416490923,
		'1729184474400': M_1729184474400,
		'1729268224296': M_1729268224296
	}
}