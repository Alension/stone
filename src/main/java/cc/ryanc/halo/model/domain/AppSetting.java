package cc.ryanc.halo.model.domain;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import lombok.Data;

/**
 * @author xin.leng
 * @title WechatAppSetting
 * @description
 * @date 2019/1/8 20:24
 */
@Data
@Entity
@Table(name = "App_Setting")
public class AppSetting implements Serializable {

    /**
     * 设置项名称
     */
    @Id
    @Column(length = 127)
    private String id;



}
