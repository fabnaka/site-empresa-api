import { InputType, Field, ClassType, Int, Float, ObjectType } from "type-graphql";

@InputType("PrimeFilterItemString")
export class PrimeFilterItemString {
  @Field({ nullable: true })
  value?: string;
  @Field({ nullable: true })
  matchMode?: string;
}

@InputType("PrimeFilterItemInt")
export class PrimeFilterItemInt {
  @Field(type => Int, { nullable: true })
  value?: number;
  @Field({ nullable: true })
  matchMode?: string;
}

@InputType("PrimeFilterItemStringArray")
export class PrimeFilterItemStringArray {
  @Field(type => [String], { nullable: true })
  value?: string[];
  @Field({ nullable: true })
  matchMode?: string;
}

@InputType("PrimeFilterItemIntArray")
export class PrimeFilterItemIntArray {
  @Field(type => [Int], { nullable: true })
  value?: number[];
  @Field({ nullable: true })
  matchMode?: string;
}

@InputType("PrimeFilterItemFloatArray")
export class PrimeFilterItemFloatArray {
  @Field(type => [Float], { nullable: true })
  value?: number[];
  @Field({ nullable: true })
  matchMode?: string;
}

@InputType("PrimeFilterItemFloat")
export class PrimeFilterItemFloat {
  @Field(type => Float, { nullable: true })
  value?: number;
  @Field({ nullable: true })
  matchMode?: string;
}

@InputType("PrimeFilterItemBoolean")
export class PrimeFilterItemBoolean {
  @Field(type => Boolean, { nullable: true })
  value?: boolean;
  @Field({ nullable: true })
  matchMode?: string;
}

export interface IPrimeDataTableRequest<T> {
  filters?: T;
  first?: number;
  rows?: number;
  sortField?: string;
  sortOrder?: number;
}

export function PrimeDataTableRequest<TItem>(TItemClass: ClassType<TItem>) {
  @InputType("FilterMain", { isAbstract: true })
  abstract class FilterMain {
    @Field(type => TItemClass, { nullable: true })
    filters?: TItem;
    @Field(type => Int, { nullable: true })
    first?: number;
    @Field(type => Int, { nullable: true })
    rows?: number;
    @Field({ nullable: true })
    sortField?: string;
    @Field(type => Int, { nullable: true })
    sortOrder?: number;
    @Field({ nullable: true })
    globalFilter?: string;
  }
  return FilterMain as any;
}

export function PrimeDataTableResponse<TItem>(TItemClass: ClassType<TItem>) {
  @ObjectType("FilterMain", { isAbstract: true })
  abstract class FilterMain {
    @Field(type => [TItemClass], { nullable: true })
    rows?: [TItem];
    @Field(type => Int, { nullable: true })
    count?: number;
  }
  return FilterMain as any;
}