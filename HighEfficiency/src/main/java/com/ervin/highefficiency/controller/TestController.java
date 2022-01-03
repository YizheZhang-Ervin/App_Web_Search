package com.ervin.highefficiency.controller;


import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/encrypt")
public class TestController {

    @Autowired
    StringEncryptor stringEncryptor;

    @GetMapping("/default")
    public Map<String,String> encrypt(@RequestParam(value = "text") String text){
        Map<String,String> res = new HashMap<>();
        res.put("plain",text);
        System.out.println("PlainText:" + text);
        String encryptTxt = stringEncryptor.encrypt(text);
        res.put("encrypt",encryptTxt);
        System.out.println("EncryptText:" + encryptTxt);
        String decryptTxt = stringEncryptor.decrypt(encryptTxt);
        res.put("decrypt",decryptTxt);
        System.out.println("DecryptText:" + decryptTxt);
        return res;
    }

    // PBEWITHHMACSHA512ANDAES_256
    @GetMapping("/sha512aes256")
    public Map<String,String> encrypt2(@RequestParam(value = "text") String text){
        Map<String,String> res = new HashMap<>();
        res.put("plain",text);

        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        SimpleStringPBEConfig config = new SimpleStringPBEConfig();
        config.setPassword("123=.abc");
        config.setAlgorithm("PBEWITHHMACSHA512ANDAES_256");
        config.setKeyObtentionIterations("1000");
        config.setPoolSize("1");
        config.setProviderName(null);
        config.setProviderClassName(null);
        config.setSaltGeneratorClassName("org.jasypt.salt.RandomSaltGenerator");
        config.setIvGeneratorClassName("org.jasypt.salt.NoOpIVGenerator");
        config.setStringOutputType("base64");
        encryptor.setConfig(config);

        System.out.println("PlainText:" + text);
        String encryptTxt = encryptor.encrypt(text);
        res.put("encrypt",encryptTxt);
        System.out.println("EncryptText:" + encryptTxt);
        String decryptTxt = encryptor.decrypt(encryptTxt);
        res.put("decrypt",decryptTxt);
        System.out.println("DecryptText:" + decryptTxt);
        return res;
    }

    // PBEWithMD5AndDES
    @GetMapping("/md5aes")
    public Map<String,String> encrypt3(@RequestParam(value = "text") String text){
        Map<String,String> res = new HashMap<>();
        res.put("plain",text);

        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        SimpleStringPBEConfig config = new SimpleStringPBEConfig();
        config.setPassword("123=.abc");
        config.setAlgorithm("PBEWithMD5AndDES");
        config.setKeyObtentionIterations("1000");
        config.setPoolSize("1");
        config.setProviderName(null);
        config.setProviderClassName(null);
        config.setSaltGeneratorClassName("org.jasypt.salt.RandomSaltGenerator");
        config.setIvGeneratorClassName("org.jasypt.salt.NoOpIVGenerator");
        config.setStringOutputType("base64");
        encryptor.setConfig(config);

        System.out.println("PlainText:" + text);
        String encryptTxt = encryptor.encrypt(text);
        res.put("encrypt",encryptTxt);
        System.out.println("EncryptText:" + encryptTxt);
        String decryptTxt = encryptor.decrypt(encryptTxt);
        res.put("decrypt",decryptTxt);
        System.out.println("DecryptText:" + decryptTxt);
        return res;
    }
}
