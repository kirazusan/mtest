

package frontend.actions;

import frontend.enums.ActionTypes;

public class CalculatorActions {
    public static class OnClear {
        public static final String TYPE = ActionTypes.ON_CLEAR;
    }

    public static class UpdateCurrentEntry {
        public static final String TYPE = ActionTypes.UPDATE_CURRENT_ENTRY;
        public static final String ENTRY = "entry";
    }

    public static class UpdateResult {
        public static final String TYPE = ActionTypes.UPDATE_RESULT;
        public static final String RESULT = "result";
    }

    public static class ResetCalculatorState {
        public static final String TYPE = ActionTypes.RESET_CALCULATOR_STATE;
    }

    public static class CalculatorActionCreator {
        public static Object onClear() {
            return new OnClear();
        }

        public static Object updateCurrentEntry(String entry) {
            return new UpdateCurrentEntry(entry);
        }

        public static Object updateResult(String result) {
            return new UpdateResult(result);
        }

        public static Object resetCalculatorState() {
            return new ResetCalculatorState();
        }
    }
}