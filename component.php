<?php
/**
 * This template is version for print
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

//Enable Bootstrap 3 framework  
$doc->addStyleSheet($template_url . '/libs/bootstrap/css/bootstrap.min.css');
$doc->addStyleSheet($template_url . '/libs/bootstrap/css/bootstrap-theme.min.css');
$doc->addScript($template_url . '/libs/bootstrap/js/bootstrap.min.js');

//Include stylesheets
$doc->addStyleSheet($template_url . '/css/template.css');

//Enable Jquery
$doc->addScript('//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js');
                    
//Enable jQuery-Rollbar Jquery plugin
$doc->addStyleSheet($template_url . '/libs/jQuery-Rollbar/css/liimeBar.css');
$doc->addScript($template_url . '/libs/jQuery-Rollbar/js/jquery.mousewheel.min.js');
$doc->addScript($template_url . '/libs/jQuery-Rollbar/js/jquery.liimeBar.packed.js');


$doc->addStyleSheet($template_url . '/libs/custom_scrollbar.css');
$doc->addScript($template_url . '/libs/custom_scrollbar.min.js');

//Include scripts
$doc->addScript($template_url . '/js/scripts.js');

// Check for a custom CSS file
$userCss = JPATH_SITE . '/templates/' . $this->template . '/css/user.css';

if($task == "edit" || $layout == "form" )
{
	$fullWidth = 1;
}
else
{
	$fullWidth = 0;
}

// Use of Google Font
if ($this->params->get('googleFont'))
{
	$doc->addStyleSheet('//fonts.googleapis.com/css?family=' . $this->params->get('googleFontName'));
	$doc->addStyleDeclaration("
	h1, h2, h3, h4, h5, h6, .site-title {
		font-family: '" . str_replace('+', ' ', $this->params->get('googleFontName')) . "', sans-serif;
	}");
}

// Template color
if ($this->params->get('templateColor'))
{
	$doc->addStyleDeclaration("
	body.site {
		border-top: 3px solid " . $this->params->get('templateColor') . ";
		background-color: " . $this->params->get('templateBackgroundColor') . ";
	}
	a {
		color: " . $this->params->get('templateColor') . ";
	}
	.nav-list > .active > a,
	.nav-list > .active > a:hover,
	.dropdown-menu li > a:hover,
	.dropdown-menu .active > a,
	.dropdown-menu .active > a:hover,
	.nav-pills > .active > a,
	.nav-pills > .active > a:hover,
	.btn-primary {
		background: " . $this->params->get('templateColor') . ";
	}");
}

// Menu color
if ($this->params->get('menuColor'))
{
    $doc->addStyleDeclaration("
    .menu-nav-top{
        background-color: " . $this->params->get('menuColor') . ";
    }
    ");
}

// Logo file or site title param
if ($this->params->get('logoFile'))
{
	$logo = '<a href="' . $home_url . '"><img src="' . JUri::root() . $this->params->get('logoFile') . '" itemtype="https://schema.org/ImageObject" itemscope="itemscope" itemprop="logo"  alt="' . $sitename . '" /></a>';
}
elseif ($this->params->get('sitetitle'))
{
	$logo = '<a href="' . $home_url . '"> <span itemscope="itemscope" itemprop="logo" class="site-title"  title="' . $sitename . '">' . htmlspecialchars($this->params->get('sitetitle'), ENT_COMPAT, 'UTF-8') . '</span></a>';
}
else
{
	$logo = '<a href="' . $home_url . '"><span itemscope="itemscope" itemprop="logo" class="site-title" title="' . $sitename . '">' . $sitename . '</span></a>';
}
?>
<!DOCTYPE html>
<html lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
    <head>
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <jdoc:include type="head" />
    <!--[if lt IE 9]>
        <script <script src="<?php echo JUri::root(true); ?>/media/jui/js/html5.js"></script>
        <![endif]-->
    </head>
</head>
<body class="contentpane modal">
	<jdoc:include type="message" />
	<jdoc:include type="component" />
</body>
</html>  