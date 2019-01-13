package cc.ryanc.halo.model.enums;

/**
 * @author xin.leng
 * @title UserRole
 * @description
 * @date 2019/1/9 19:58
 */
public enum UserRole {

    MANAGER(99, "管理员"),


    MEMBER(0, "会员");

    private Integer code;
    private String desc;

    UserRole(Integer code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public Integer getCode() {
        return code;
    }

    public String getDesc() {
        return desc;
    }
}
