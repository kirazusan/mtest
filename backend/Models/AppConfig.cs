package backend.Models;

public class AppConfig {
    private String theme;
    private boolean featureFlag;
    private String language;
    private String version;
    private String apiUrl;

    public AppConfig(String theme, boolean featureFlag, String language, String version, String apiUrl) {
        this.theme = theme;
        this.featureFlag = featureFlag;
        this.language = language;
        this.version = version;
        this.apiUrl = apiUrl;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public boolean isFeatureFlag() {
        return featureFlag;
    }

    public void setFeatureFlag(boolean featureFlag) {
        this.featureFlag = featureFlag;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getApiUrl() {
        return apiUrl;
    }

    public void setApiUrl(String apiUrl) {
        this.apiUrl = apiUrl;
    }
}