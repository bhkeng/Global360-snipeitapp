export class TestUtils {

    // Function to generate a random asset tag
    static generateRandomAssetTag(): string {
        const randomDigits = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
        return `ZZZZ${randomDigits}`;
    };

    // Function to convert selected user's name from "Last, First (xxxx..." to "First Last" only and stripping out all extra characters
    static formatNameToFirstLast(selectedUser: string): string {
        selectedUser = selectedUser.split('(')[0].trim(); // Remove any text after the parentheses
        const parts = selectedUser.split(',').map(part => part.trim()); // Split by comma and trim whitespace
        const selectedUserFirstLastName = `${parts[1]} ${parts[0]}`; // Join as "First Last"
        return selectedUserFirstLastName
    };
    
    // function to generate a random index number used to pick a random user from Checkout to user drop down list
    static generateRandomOptionNumber(optionCount: number): number {
        return Math.floor(Math.random() * optionCount) 
    };
}