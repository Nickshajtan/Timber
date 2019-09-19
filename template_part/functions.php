<?php
/**
 * This a file for template settings variables
 *
 */
defined('_JEXEC') or die;
$app             = JFactory::getApplication();
$doc             = JFactory::getDocument();
$user            = JFactory::getUser();
$this->language  = $doc->language;
$this->direction = $doc->direction;

// Output as HTML5
$doc->setHtml5(true);

// Getting params from template
$params = $app->getTemplate(true)->params;

// Detecting Active Variables
$option          = $app->input->getCmd('option', '');
$view            = $app->input->getCmd('view', '');
$layout          = $app->input->getCmd('layout', '');
$task            = $app->input->getCmd('task', '');
$itemid          = $app->input->getCmd('Itemid', '');
$sitename        = $app->get('sitename');
$sitedescription = $app->get('sitedescription');
$menu            = $app->getMenu();
$home_url        = $this->baseurl;
$home_page       =(JURI::getInstance()->toString()==JURI::base());
$template_url    = $this->baseurl . '/templates/' . $this->template;

//Enable Jquery
$doc->addScript('//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js');

//Enable Bootstrap 3 framework  
$doc->addStyleSheet($template_url . '/libs/bootstrap/css/bootstrap.min.css');
$doc->addStyleSheet($template_url . '/libs/bootstrap/css/bootstrap-theme.min.css');
$doc->addScript($template_url . '/libs/bootstrap/js/bootstrap.min.js');

//Include stylesheets
$doc->addStyleSheet($template_url . '/css/template.css');
//Include animation file
$doc->addStyleSheet($template_url . '/css/animate.min.css');
//Incude wow js
$doc->addScript($template_url . '/js/wow.min.js');
//Include scroll plugin
$doc->addScript($template_url . '/libs/jquery.nicescroll.js');

//Include icon fonts
$doc->addStyleSheet($template_url . '/fonts/icons/fontello.css');
$doc->addStyleSheet($template_url . '/fonts/icons/fontello-codes.css');
$doc->addStyleSheet($template_url . '/fonts/icons/fontello-embedded.css');
$doc->addStyleSheet($template_url . '/fonts/icons/fontello-ie7.css');
$doc->addStyleSheet($template_url . '/fonts/icons/fontello-ie7-codes.css');
$doc->addStyleSheet($template_url . '/fonts/icons/animation.css');

//Include jscroll plugin
$doc->addScript($template_url . '/libs/jquery.jscroll.js');

//Include scripts
$doc->addScript($template_url . '/js/scripts.js');

// Check for a custom CSS file
$userCss = JPATH_SITE . '/templates/' . $this->template . '/css/user.css';
