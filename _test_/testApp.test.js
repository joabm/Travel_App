import "regenerator-runtime/runtime";
import { performAction } from "../src/client/js/app";

describe("Testing the performAction function is defined", () => {
    test("Testing the performAction() function", () => {

           expect(performAction).toBeDefined();
})});