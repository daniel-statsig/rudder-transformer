const name = "Proxy";
const fs = require("fs");
const path = require("path");
const { mockedAxiosClient } = require("../__mocks__/network");
const destinations = ["marketo", "braze", "bqstream"];
const service = require("../versionedRouter").handleProxyRequest;

jest.mock("axios", () => jest.fn(mockedAxiosClient));

// start of generic tests
const inputDataFile = fs.readFileSync(
  path.resolve(__dirname, `./data/proxy_input.json`)
);
const outputDataFile = fs.readFileSync(
  path.resolve(__dirname, `./data/proxy_output.json`)
);
const inputData = JSON.parse(inputDataFile);
const expectedData = JSON.parse(outputDataFile);

inputData.forEach((input, index) => {
  it(`${name} Tests: payload - ${index}`, async () => {
    try {
      const output = await service("any", input);
      expect(output).toEqual(expectedData[index]);
    } catch (error) {
      expect(error).toEqual(expectedData[index]);
    }
  });
});
// end of generic tests

// destination tests start
destinations.forEach(destination => {
  const inputDataFile = fs.readFileSync(
    path.resolve(__dirname, `./data/${destination}_proxy_input.json`)
  );
  const outputDataFile = fs.readFileSync(
    path.resolve(__dirname, `./data/${destination}_proxy_output.json`)
  );
  const inputData = JSON.parse(inputDataFile);
  const expectedData = JSON.parse(outputDataFile);

  inputData.forEach((input, index) => {
    it(`${name} Tests: ${destination} - Payload ${index}`, async () => {
      try {
        const output = await service(destination, input);
        expect(output).toEqual(expectedData[index]);
      } catch (error) {
        expect(error).toEqual(expectedData[index]);
      }
    });
  });
});
// destination tests end
