import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

export async function syncLinkedInSheetToMain(sourceSheetId, targetSheetId) {
  try {
    // Google Sheets API setup
    const auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
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

// Test the function
const testSync = async () => {
  try {
    const result = await syncLinkedInSheetToMain(
      process.env.LINKEDIN_SHEET_ID,
      process.env.TARGET_SHEET_ID
    );
    console.log('Sync result:', result);
  } catch (error) {
    console.error('Sync error:', error);
  }
};

// Run the test if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testSync();
} 