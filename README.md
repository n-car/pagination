
# JSON-RPC API Endpoint

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/json-rpc-api-endpoint.svg)](https://www.npmjs.com/package/json-rpc-api-endpoint)
[![Build Status](https://github.com/n-car/json-rpc-api-endpoint/actions/workflows/main.yml/badge.svg)](https://github.com/n-car/json-rpc-api-endpoint/actions)
[![Coverage Status](https://coveralls.io/repos/github/n-car/json-rpc-api-endpoint/badge.svg?branch=main)](https://coveralls.io/github/n-car/json-rpc-api-endpoint?branch=main)

Data pagination utilities.

## Installation

You can install the package via npm:

```bash
npm install n-car/pagination
```

Or using yarn:

```bash
yarn add n-car/pagination
```

## Usage

### Basic Setup

Integrate `Pagination` utilities in your code.

```javascript

const { evaluatePagination } = require('pagination');

const items = [
    { id: 0, name: 'Item 1', description: 'Description 1' },
    { id: 1, name: 'Item 2', description: 'Description 2' },
    { id: 2, name: 'Item 3', description: 'Description 3' },
];

/**
 * This function returns the items in a paginated way.
 * @param {number} pageNumber 
 * @param {number} pageSize 
 * @returns {Promise<{ records: any[], pageNumber: number, pageSize: number, totalRecords: number, totalPages: number }>}
 */
const getItemsPaginated = (pageNumber, pageSize) => {
    try {
        const totalItems = items.length;

        const pagination = evaluatePagination(pageNumber, pageSize, totalItems);

        const records = records.slice(skip, skip + pageSize);

        return {
            records,
            pageNumber: pagination.pageNumber,
            pageSize: pagination.pageSize,
            totalRecords: pagination.totalRecords,
            totalPages: pagination.totalPages
        };

    } catch (error) {
        throw new NestedError(`TubesManager.getTubesPaginated()`, error);
    }
}

// This request is in range
try {
    console.dir(getItemsPaginated(1, 2));
}
catch (error) {
    console.error(error);
}
// Output:
// {
//     records: [
//         { id: 0, name: 'Item 1', description: 'Description 1' },
//         { id: 1, name: 'Item 2', description: 'Description 2' }
//     ],
//     pageNumber: 1,
//     pageSize: 2,
//     totalRecords: 3,
//     totalPages: 2
// }

// This request is out of range, but it will be adjusted
try {
    console.dir(getItemsPaginated(7, 2));
}
catch (error) {
    console.error(error);
}
// Output:
// {
//     records: [
//          { id: 2, name: 'Item 3', description: 'Description 3' },
//     ],
//     pageNumber: 2,
//     pageSize: 2,
//     totalRecords: 3,
//     totalPages: 2
// }

try {
    console.dir(getItemsPaginated(0, 2));
}
catch (error) {
    // Error: Invalid page number: 0
    console.error(error);
}

try {
    console.dir(getItemsPaginated(1, 0));
}
catch (error) {
    // Error: Invalid page size: 0
    console.error(error);
}

```

## API

### evaluatePagination function

A function to evaluate the pagination of records.

#### Constructor

```javascript
const pagination = evaluatePagination(pageNumber, pageSize, totalRecords);
```

- **pageNumber**: *(number)* - The number of page to retrieve (minimum is 1).
- **pageSize**: *(number)* - The length of the data to fit in the paged result (minimum is 1).
- **totalRecords** *(number)* - The total length of records available.
- **returns**: *({ skip, pageSize, pageNumber, totalPages })* - The adjusted values for retrieving the data.

## Examples

Check out the [examples](./examples) directory for more usage examples.

## License

This project is licensed under the [MIT License](LICENSE).
