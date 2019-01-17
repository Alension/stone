package cc.ryanc.halo.model.enums;

/**
 * @author xin.leng
 * @title MiniProgramPropertiesEnum
 * @description
 * @date 2019/1/15 13:14
 */
public enum  MiniProgramPropertiesEnum {

    /**
     * 附件存储位置
     */
    LOGIN_URL_FORMAT("https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code"),

    /**
     * 附件存储位置
     */
    APP_ID("app_id"),

    /**
     * 附件存储位置
     */
    APP_SECRET("app_secret");

    private String value;

    MiniProgramPropertiesEnum(String value){
        this.value = value;
    }

    public String getValue(){
        return value;
    }

}
