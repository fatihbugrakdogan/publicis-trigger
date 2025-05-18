import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

export async function syncLinkedInSheetToMain(sourceSheetId, targetSheetId) {
  try {
    // Google Sheets API setup
    const auth = new JWT({
      email: "neom-service-account@neom-airtable-integration.iam.gserviceaccount.com",
      key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC6H1tsJBl80F4J\nVcXfVLzfUacRznzBNPs6Xa1Q+hvWjv+CvdNGKfWOgUkN1fhNjVgdS4kLxTQT897r\nNsHKatOy09l5khXRTVkKAcBAVeQYuDYmd6q86jcJk9VZqzGkz7hSmapJyrRjQvZN\nXXNpzF/sVLBh/zJJcgZd4pff5UUVtcjDZUy2dGjtF+fbY1VNI3MfsV+E72o44x+J\nlSc8KDCgfwCCPkDRJ0GmO6uymk83sMHVtI0H2+XQ0EnJGFqAwXNzLJqWDI3udxaC\n165JlNYUrFwVdW0a1/AoRA75WiQ0lE4fGh2R+SL0tS8DVUa/qmlNd+yoLtTcR/nG\nNbrusWfRAgMBAAECggEASIv6bZ9wk9cAIHFfbFqyN/Wywl0TAZguKKTk7oBeo3Yf\noA1vsZSfU0mPeSYi38+tPdX4eC8IypIvHM2+IbEcDUNILHvFp0yX3S+riSgxfXUo\nHjxcv8AnbcNC0O3KruwMc53T42lwgJRUPvmjB+USqqKkEb6QElKwqp2tBydtkzUZ\nXVXUAIQu5DsrcEcZXnnF2AUD7ngeV5lgFZUO0dvbZiqnU2LTvV3OhvCelBBD1ZnU\nl1N1Ta1XGBvx6hzISOsvYTFSLUTk/OsX4tHy9ViQrK4BF+JvNSiLrlrcuGGlXktJ\nHJp5iv2KVfKsN7haoXqARZNkaFWMbFxxPdNPOrbT1QKBgQD6pa8z6KL00xuzB2Rt\nRqGFtKL4PYXWQfCNuiHj53Wyk2AK7uhfaI22+217nwRRlkMH2/+CM0iaO6rrUHft\n9qWFcaayFppJqS/otZOtCUwunES1vDOhxVV9cXslJHSFd5IOxeUb4VQ/DtlllyRb\nv6muUayzjP9mNk/8Kiyi8QrcWwKBgQC+GOi45402fCfNpudKBSxZsWD2F0dL1R4g\nVkS6oMOOdM2cDYQ1cnxMxtqt8KmVd9e2VgZpK/ToQTSKmG2SHPrdnfEvWqqnvwdf\nsJsQa7Y9Si3EiN0v7Ji80wAAQeMv9f6iuRtzQmV7EVoWJL3q2fMkykVTWGWw86B8\nlGIx0On0QwKBgA6cEbZI3RbAJ2EsESJ9d3S/rrAhheeTOF5Kdyc9mpKqHHMGsey9\nv2TnCt6lyi6nP4j5vc7tBlJXIANPUW5Bbix1D25Z+uxIPE6oJs9zN0mQOkENk0Te\np7kEIFVt5ozRB2ZtComxfKOgTfOp96iRZ2aNxC9DDK/8gnUEUE2/Fw75AoGALwHd\n2ot3wfdlqFcTbpxk4TEZtwD+omPq9Tgf+r5yXTHI/kPhY44R6rJptQWECe/+qZoQ\nL8Ws5BnrsjILNkxwRIkf8QPMm3qDikgTsDXSdMl5E9Z8S7OH+Xl70JR6Z4u/EeIQ\nRaovigU6b6taQ07t7zUNe5SqYN193BCdT5BHqh0CgYAjWqF5hTR8OinD3DvA1KD2\ns3nZDUciTRuqey4wUk016ajmPNQfAcQmSbLik1IaCvky48RakMFtbblwoG5LtP4T\ncJJ8vBiqMSYuMUqJ6J7Y5mXPMgVVHDHLfpfIlrckDawtGLXME0D9qFLKCupXIxTi\nz/rZ71Ka6NOJuuJYtydC7A==\n-----END PRIVATE KEY-----\n",
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Check if LinkedIn sheet exists and delete it if it does
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: targetSheetId,
    });

    const existingSheet = spreadsheet.data.sheets.find(sheet => sheet.properties.title === 'LinkedIn');
    
    if (existingSheet) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: targetSheetId,
        resource: {
          requests: [{
            deleteSheet: {
              sheetId: existingSheet.properties.sheetId
            }
          }]
        }
      });
    }

    // Create new sheet in main spreadsheet
    const createSheetResponse = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: targetSheetId,
      resource: {
        requests: [{
          addSheet: {
            properties: {
              title: 'LinkedIn'
            }
          }
        }]
      }
    });

    // Read data from LinkedIn sheet
    const linkedinResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: sourceSheetId,
      range: 'A:Z', // Adjust range as needed
    });

    const linkedinData = linkedinResponse.data.values;

    // Write data to new sheet
    const updateResponse = await sheets.spreadsheets.values.update({
      spreadsheetId: targetSheetId,
      range: 'LinkedIn!A1',
      valueInputOption: 'RAW',
      resource: {
        values: linkedinData,
      },
    });

    console.log('Data synced successfully to new sheet: LinkedIn');
    return {
      success: true,
      message: 'Data synced successfully to new sheet',
      data: {
        sheetName: 'LinkedIn',
        updateResponse: updateResponse.data
      }
    };

  } catch (error) {
    console.error('Error syncing sheets:', error);
    return {
      success: false,
      message: error.message,
      error: error
    };
  }
}

// Helper function to extract sheet ID from URL
export function extractSheetIdFromUrl(url) {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}

// Test the function
const testSync = async () => {
  try {
    const sourceUrl = 'https://docs.google.com/spreadsheets/d/1p1V9i6VeyvKT9kIsA_Y6aFE5_kz3XhN2-D8y59a8adw/edit';
    const targetUrl = 'https://docs.google.com/spreadsheets/d/1dKPY8vwGdNNP1pVLd3r29fSn2_vB8yIWZI8TK08Sgv0/edit';
    
    const sourceSheetId = extractSheetIdFromUrl(sourceUrl);
    const targetSheetId = extractSheetIdFromUrl(targetUrl);
    
    if (!sourceSheetId || !targetSheetId) {
      throw new Error('Invalid sheet URL');
    }

    const result = await syncLinkedInSheetToMain(sourceSheetId, targetSheetId);
    console.log('Sync result:', result);
  } catch (error) {
    console.error('Sync error:', error);
  }
};

// Run the test if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testSync();
} 