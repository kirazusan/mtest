

package frontend;

import frontend.actions.SelectNumberAction;
import frontend.state.ApplicationState;
import frontend.state.Entry;
import frontend.exceptions.InvalidNumberException;
import frontend.exceptions.StateUpdateException;

public class SelectNumber {
    public static void selectNumber(ApplicationState state, int number) {
        try {
            if (!isValidNumber(number)) {
                throw new InvalidNumberException("Invalid number entered");
            }
            Entry currentEntry = state.getCurrentEntry();
            if (currentEntry == null) {
                currentEntry = new Entry();
            }
            String newEntry = currentEntry.getValue() + number;
            Entry newCurrentEntry = new Entry(newEntry);
            state.setCurrentEntry(newCurrentEntry);
            state.dispatch(new SelectNumberAction(number));
        } catch (InvalidNumberException e) {
            System.err.println("Error: " + e.getMessage());
        } catch (StateUpdateException e) {
            System.err.println("Error updating state: " + e.getMessage());
        }
    }

    private static boolean isValidNumber(int number) {
        // implement number validation logic here
        return true;
    }
}