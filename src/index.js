"use strict";

const evaluatePagination = (pageNumber, pageSize, totalRecords) => {
    if (pageSize < 1) throw new Error(`Invalid page size: ${pageSize}`);
    const skip = (pageNumber - 1) * pageSize;
    if (skip < 0) throw new Error(`Invalid page number: ${pageNumber}`);
    const totalPages = Math.ceil(totalRecords / pageSize);
    pageNumber = Math.min(Math.max(pageNumber, 1), totalPages);
    return { skip, pageSize, pageNumber, totalPages };
}

module.exports = { evaluatePagination };
