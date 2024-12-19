"use strict";

/**
 * Evaluates pagination parameters.
 * @param {number} pageNumber - The current page number (1-based).
 * @param {number} pageSize - The number of records per page.
 * @param {number} totalRecords - The total number of records.
 * @returns {Object} An object containing skip, pageSize, pageNumber, and totalPages.
 * @throws Will throw an error if pageSize < 1 or if pageNumber results in negative skip.
 */
const evaluatePagination = (pageNumber = 1, pageSize = 10, totalRecords = 0) => {
    // Type checking
    if (typeof pageNumber !== 'number' || typeof pageSize !== 'number' || typeof totalRecords !== 'number') {
        throw new TypeError('All parameters must be numbers.');
    }

    // Validate pageSize
    if (pageSize < 1) throw new Error(`Invalid page size: ${pageSize}. Page size must be at least 1.`);

    // Calculate skip
    const skip = (pageNumber - 1) * pageSize;
    if (skip < 0) throw new Error(`Invalid page number: ${pageNumber}. Page number must be 1 or greater.`);

    // Calculate totalPages, ensuring at least 1 page
    const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

    // Adjust pageNumber within valid range without mutating the input
    const adjustedPageNumber = Math.min(Math.max(pageNumber, 1), totalPages);

    return { skip, pageSize, pageNumber: adjustedPageNumber, totalPages };
}

module.exports = { evaluatePagination };
