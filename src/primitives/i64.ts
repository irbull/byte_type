import { type Options, SizedType } from "../types/mod.ts";
import { isLittleEndian } from "../util.ts";

export class I64 extends SizedType<bigint> {
  constructor(readonly littleEndian = isLittleEndian) {
    super(8, 8);
  }

  readPacked(dt: DataView, options: Options = { byteOffset: 0 }): bigint {
    super.rangeCheck(dt.byteLength, options.byteOffset);
    const value = dt.getBigInt64(options.byteOffset, this.littleEndian);
    super.incrementOffset(options);
    return value;
  }

  writePacked(
    value: bigint,
    dt: DataView,
    options: Options = { byteOffset: 0 },
  ): void {
    super.rangeCheck(dt.byteLength, options.byteOffset);
    dt.setBigInt64(options.byteOffset, value, this.littleEndian);
    super.incrementOffset(options);
  }
}

export const i64le = new I64(true);
export const i64be = new I64(false);
export const i64 = new I64();
