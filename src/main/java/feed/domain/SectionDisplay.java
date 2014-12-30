package feed.domain;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import java.io.Serializable;

/**
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class SectionDisplay implements Serializable {

    private static final long serialVersionUID = 1L;

    private boolean showTitle;
    private boolean showIngredients;
    private boolean showSteps;

    public boolean isShowTitle() {
        return showTitle;
    }

    public void setShowTitle(boolean showTitle) {
        this.showTitle = showTitle;
    }

    public boolean isShowIngredients() {
        return showIngredients;
    }

    public void setShowIngredients(boolean showIngredients) {
        this.showIngredients = showIngredients;
    }

    public boolean isShowSteps() {
        return showSteps;
    }

    public void setShowSteps(boolean showSteps) {
        this.showSteps = showSteps;
    }
}
