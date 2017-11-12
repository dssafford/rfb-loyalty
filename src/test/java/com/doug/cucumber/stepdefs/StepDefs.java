package com.doug.cucumber.stepdefs;

import com.doug.RfbloyaltyApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = RfbloyaltyApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
