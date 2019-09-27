<?php

namespace TAMACHI;

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<div id="tamachi-app">
		<div id="tamachi-page" class="<?php echo esc_attr( PageData::getHtmlRootClasses() ); ?>">
			<main id="tamachi-content">
