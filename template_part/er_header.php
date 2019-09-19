<?php
/*
 * Header part of any page
 *
 */
?>
<!DOCTYPE html>
<html lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php // Use of Google Font ?>
    <?php if ($params->get('googleFont')) : ?>
    <link href="//fonts.googleapis.com/css?family=<?php echo $params->get('googleFontName'); ?>" rel="stylesheet" />
    <style>
			h1, h2, h3, h4, h5, h6, .site-title {
				font-family: '<?php echo str_replace('+', ' ', $params->get('googleFontName')); ?>', sans-serif;
			}
		</style>
    <?php endif; ?>
    <link href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/libs/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
     <link href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/libs/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" />
    <link href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/template.css" rel="stylesheet" />
    <link href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/error-page.css" rel="stylesheet" />
    <link href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/favicon.ico" rel="shortcut icon" type="image/vnd.microsoft.icon" />
    <script src="//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/libs/bootstrap/js/bootstrap.min.js"></script>
    <script src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/libs/jquery.nicescroll.js"></script>
    <script> 
	$(document).ready(function() {
		var nice = $("html").niceScroll(); 
	}); 
</script> 
    <script src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/error-page.js"></script>
    <?php // Template color ?>
    <?php if ($params->get('templateColor')) : ?>
    <style>
        		body.site {
				border-top: 3px solid <?php echo $params->get('templateColor'); ?>;
				background-color: <?php echo $params->get('templateBackgroundColor'); ?>
			}
			a {
				color: <?php echo $params->get('templateColor'); ?>;
			}
			.navbar-inner, .nav-list > .active > a, .nav-list > .active > a:hover, .dropdown-menu li > a:hover, .dropdown-menu .active > a, .dropdown-menu .active > a:hover, .nav-pills > .active > a, .nav-pills > .active > a:hover {
				background: <?php echo $params->get('templateColor'); ?>;
			}
			.navbar-inner {
				-moz-box-shadow: 0 1px 3px rgba(0, 0, 0, .25), inset 0 -1px 0 rgba(0, 0, 0, .1), inset 0 30px 10px rgba(0, 0, 0, .2);
				-webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .25), inset 0 -1px 0 rgba(0, 0, 0, .1), inset 0 30px 10px rgba(0, 0, 0, .2);
				box-shadow: 0 1px 3px rgba(0, 0, 0, .25), inset 0 -1px 0 rgba(0, 0, 0, .1), inset 0 30px 10px rgba(0, 0, 0, .2);
			}
    </style>
   <?php endif; ?>    
   <?php // Menu color ?>
   <?php if ($params->get('menuColor')) : ?>
   <style>
       .menu-nav-top{
        background-color: <?php echo $params->get('menuColor'); ?>;
    }
       .menu-nav-top ul>li>a, .logo a{
        color: <?php echo $params->get('menuTextColor'); ?>;
    }
    .navbar-toggle{
        border: 1px solid <?php echo $params->get('menuTextColor'); ?>;
    }
    .icon-bar{
            background-color: <?php echo $params->get('menuTextColor'); ?>;
    }
   </style>
   <?php endif; ?>    
 <!--[if lt IE 9]><script src="<?php echo JUri::root(true); ?>/media/jui/js/html5.js"></script><![endif]-->
  </head>
       <body itemscope="itemscope" itemtype="http://schema.org/WebPage" class="site <?php echo $option
	. ' view-' . $view
	. ($layout ? ' layout-' . $layout : ' no-layout')
	. ($task ? ' task-' . $task : ' no-task')
	. ($itemid ? ' itemid-' . $itemid : '')
	. ($params->get('fluidContainer') ? ' fluid' : '');
    echo ($this->direction == 'rtl' ? ' rtl' : '');                                                                       
?>">
        <!-- Body -->
        <div class="global global-wrapper<?php echo ($params->get('fluidContainer') ? '-fluid' : ''); ?>">
            <div class="canvas-animation">
                <canvas id="stars" class="hidden-sm visible-md visible-lg hidden-xs"></canvas>
                <div class="page-content-wrapper">
                   <!-- Header -->       
                    <section class="header-wrapper">
                        <header itemscope="itemscope" itemtype="http://schema.org/Header">
                         <!--Fixed top menu-->
    <nav itemscope="itemscope" itemtype="http://www.schema.org/SiteNavigationElement" role="navigation" class="menu-nav-top navbar">
        <div class="container-fluid">
              <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed coll" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
            </button>
               <!-- LOGO -->
            <div class="logo navbar-brand">
                <?php echo $logo; ?>
            </div>
                </div>
                <div role="menu" class="nav ernav navbar-nav nav-menu" id="navbar-collapse" >
                     <?php echo $doc->getBuffer('modules', 'header-1', array('style' => 'none')); ?>
                </div>  
        </div>
    </nav>    
           </header>
                        </section>          
                        
                 <!-- Banner part of site -->
                <section class="banner-wrapper">
                    <div class="clearfix"></div>
                     <div class="container">
                          <!--For example - Breadcrumbs-->
                          <?php echo $doc->getBuffer('modules', 'header-2', array('style' => 'none')); ?>
                     </div>    
                </section>                       