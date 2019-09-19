<?php
/**
 * This a file for template settings
 *
 */
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
    .menu-nav-top ul>li>a, .logo a{
        color: ". $this->params->get('menuTextColor') . ";
    }
    .navbar-toggle{
        border: 1px solid ". $this->params->get('menuTextColor') . ";
    }
    .icon-bar{
            background-color:". $this->params->get('menuTextColor') . ";
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

$sitedescription = $this->params->get('sitedescription');