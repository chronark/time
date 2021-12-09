import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { Duration } from "./duration.ts";
// Simple name and function, compact form, but not configurable
Deno.test("Duration.second", () => {
  const d = Duration.second(5);
  assertEquals(d.seconds, 5);
});
