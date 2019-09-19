<?php
/*
 * Header part of any page
 *
 */
?>
<!DOCTYPE html>
<html lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
  <head>
   <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <jdoc:include type="head" />
    <!--[if lt IE 9]>
        <script <script src="<?php echo JUri::root(true); ?>/media/jui/js/html5.js"></script>
        <![endif]--> 
        <script src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/js/ajax-scroll.js"></script>
<script> 
	$(document).ready(function() {
		var nice = $("html").niceScroll(); 
	}); 
</script>
<script>
    $(document).ready(function() {
         wow = new WOW({ mobile: false}) 
         wow.init();
    });
</script>
 <script type="text/javascript">$(window).on('load', function () {
    var $preloader = $('#p_prldr'),
        $svg_anm   = $preloader.find('.svg_anm');
    $svg_anm.fadeOut();
    $preloader.delay(500).fadeOut('slow');
});</script> 
  </head>
       <body itemscope="itemscope" itemtype="http://schema.org/WebPage" class="site <?php echo $option
	. ' view-' . $view
	. ($layout ? ' layout-' . $layout : ' no-layout')
	. ($task ? ' task-' . $task : ' no-task')
	. ($itemid ? ' itemid-' . $itemid : '')
	. ($params->get('fluidContainer') ? ' fluid' : '');
	echo ($this->direction == 'rtl' ? ' rtl' : '');
?>">
        <div class="global global-wrapper<?php echo ($params->get('fluidContainer') ? '-fluid' : ''); ?>">
                <!--Loader-->
                <div id="p_prldr">
                    <div class="contpre">
                        <span class="svg_anm"></span>
                    </div>
                </div>
            <div class="canvas-animation">
                <canvas id="stars" class="hidden-sm visible-md visible-lg hidden-xs"></canvas>
                <div class="page-content-wrapper">      
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
            <?php if($this->countModules('header-1')) : ?>
                <div role="menu" class="nav navbar-nav nav-menu" id="navbar-collapse" >
                    <jdoc:include type="modules" name="header-1"/>
                </div>
            <?php endif; ?>   
        </div>
    </nav>    
    <progress value="0" class="progress progress-striped progress-animated">
            <div class="progress-container">
                <span class="progress-bar"></span>
            </div>
    </progress>                             
                            </header>
                        </section>          
                  <div class="scroll" id="contentcontainer">         
                    <!-- Banner part of site -->
                <section class="banner-wrapper">
                    <div class="clearfix"></div>
                <?php if($this->countModules('header-2')) : ?>
                     <div class="container">
                          <!--For example - Breadcrumbs-->
                          <jdoc:include type="modules" name="header-2"/>
                     </div>
                <?php endif; ?>
                <?php if($this->countModules('banner')) : ?>
                          <!--For example - Slider-->
                          <div class="slider" ontouchstart="this.classList.toggle('hover');">
                             <div class="slider-flipper">
                              <jdoc:include type="modules" name="banner"/>
                              <h1 itemprop="head" id="site-slogan"><a href="/"><?php echo $sitedescription; ?></a></h1>        
                            <div id="arrow">  
                              <a href="#arrow_goal"><div class="cube-arrow"></div></a>                               </div>
                          </div>
                        </div>        
                <?php endif; ?>
                </section>    