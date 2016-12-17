# USCIS Status Crawler
Crawl USCIS receipt states within a given range. See if USCIS has skipped you and processed other greencards or I-140's 

receiptIds are sequential. Those who applied after you will get larger numbers. We can use this assumption and crawl +-1000 receipts and see whether other cases were approved and what dates they were approved.

Would be great if USCIS made this data nicely available in a chart. USCIS website is terrible and unable to find a large amount of receipt numbers. On the positive note, I am glad they make the data available to see for every receipt. Much better than Canadian or Australian immigration system for visibility.

## Usage

Change your receiptId and set your range.
Run `node crawler.js`

You'll see a `data.json` file like this

```
  {
    "receiptId": "LINXXXXXXXXXX",
    "title": "Case Was Approved",
    "desc": "On August 9, 2016, we approved your Form I-131, Application For USCIS Travel Document, Receipt Number LINXXXXXXXXXX. We will mail your approval notice. Please follow the instructions in the notice. If you move, go to www.uscis.gov/addresschange to give us your new mailing address.",
    "error": ""
  },
  {
    "receiptId": "LINXXXXXXXXXX",
    "title": "",
    "desc": "",
    "error": "My Case Status does not recognize the receipt number entered. Please check your receipt number and try again. If you need further assistance, please call the National Customer Service Center at 1-800-375-5283."
  },
  {
    "receiptId": "LINXXXXXXXXXX",
    "title": "Card Was Delivered To Me By The Post Office",
    "desc": "On September 10, 2016, the Post Office delivered your new card for Receipt Number LINXXXXXXXXXX, to the address that you gave us.  The tracking number assigned is XXXXXXXXXXXXXXXXXXXXXX.  You can use your tracking number at www.USPS.com in the Quick Tools Tracking section.  If you move, go to www.uscis.gov/addresschange to give us your new mailing address.",
    "error": ""
  },
```
