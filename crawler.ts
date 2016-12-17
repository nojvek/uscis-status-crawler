import * as fs from 'fs'
import * as cheerio from 'cheerio'
import * as async from 'async'
import * as request from 'request'

const RECEIPT_PREFIX = "LIN"
const RECEIPT_ID = 1690697356
const RANGE = 1000 // Scan +-RANGE receipts
const DATA_FILE = "data.json"
const MAX_PARRALLEL_CRAWL = 10 // How many pages to crawl in parrallel

const getReceiptUrl = (receiptId: string) => `https://egov.uscis.gov/casestatus/mycasestatus.do?appReceiptNum=${receiptId}`

// Add +-RANGE to RECEIPT_ID and return receipts to crawl with the receipt prefix
const computeReceiptIds = (): string[] => {
    const receiptIds = []
    for (let i = 0; i <= RANGE * 2; i++) {
        receiptIds.push(`${RECEIPT_PREFIX}${RECEIPT_ID - RANGE + i}`)
    }
    return receiptIds
}

interface CrawlResult {
    receiptId: string
    title: string
    desc: string
    error: string
}

// Parse required fields from the USCIS website
const crawlReceiptStatus = (receiptId: string, callback: (err, result: CrawlResult) => void) => {
    request({url: getReceiptUrl(receiptId)}, (err, resp, body) => {
        if (err) console.error(err)
        const $ = cheerio.load(body);
        const title = $('.appointment-sec .text-center h1').text()
        const desc = $('.appointment-sec .text-center p').text()
        const error = $('#formErrorMessages li').text()
        const result = {receiptId, title, desc, error}
        console.log(result)
        callback(null, result)
    })
}

//// MAIN ////

const receiptNumbers = computeReceiptIds() // Get the range of receipt numbers
async.mapLimit(receiptNumbers, MAX_PARRALLEL_CRAWL, crawlReceiptStatus, (err, results: CrawlResult[]) => {
    if (err) console.error(err)
    fs.writeFileSync(DATA_FILE, JSON.stringify(results, null, '  '), 'utf-8')
    console.log('DONE');
})