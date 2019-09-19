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
if (is_callable(array($doc, 'setHtml5')))
{
    $doc->setHtml5(true);
}


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
$home_page       = (JURI::getInstance()->toString()==JURI::base());
$template_url    = $this->baseurl . '/templates/' . $this->template;
// Logo file or site title param
if ($params->get('logoFile'))
{
	$logo = '<a href="' . $home_url . '"><img src="' . JUri::root() . $params->get('logoFile') . '" itemtype="https://schema.org/ImageObject" itemscope="itemscope" itemprop="logo"  alt="' . $sitename . '" /></a>';
}
elseif ($params->get('sitetitle'))
{
	$logo = '<a href="' . $home_url . '"> <span itemscope="itemscope" itemprop="logo" class="site-title"  title="' . $sitename . '">' . htmlspecialchars($params->get('sitetitle')) . '</span></a>';
}
else
{
	$logo = '<a href="' . $home_url . '"><span itemscope="itemscope" itemprop="logo" class="site-title" title="' . $sitename . '">' . $sitename . '</span></a>';
}