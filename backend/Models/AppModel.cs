package Models;

import java.util.List;

public class AppModel {
    private String appName;
    private String version;
    private String environment;
    private boolean isRunning;
    private List<String> activeModules;

    public AppModel(String appName, String version, String environment, boolean isRunning, List<String> activeModules) {
        this.appName = appName;
        this.version = version;
        this.environment = environment;
        this.isRunning = isRunning;
        this.activeModules = activeModules;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getEnvironment() {
        return environment;
    }

    public void setEnvironment(String environment) {
        this.environment = environment;
    }

    public boolean isRunning() {
        return isRunning;
    }

    public void setRunning(boolean running) {
        isRunning = running;
    }

    public List<String> getActiveModules() {
        return activeModules;
    }

    public void setActiveModules(List<String> activeModules) {
        this.activeModules = activeModules;
    }
}