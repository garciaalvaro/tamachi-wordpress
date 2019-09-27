<?php

namespace TAMACHI;

$template      = PageData::$template;
$template_data = PageData::$template_data;

?>

<div id="tamachi-archive-toolbar">

	<?php if ( 'home' === $template ) { ?>

		<h1><?php echo esc_attr( PageData::getArchiveToolbarLabel() ); ?></h1>

	<?php

	} else if ( 'date' === $template && ! empty( $template_data['items'] ) ) {

		set_query_var( 'tamachi-breadcrumbs-items', $template_data['items'] );

		get_template_part( 'template-parts/breadcrumbs' );

	} else if ( 'taxonomy' === $template && ! empty( $template_data['items'] ) ) {

		set_query_var( 'tamachi-breadcrumbs-items', $template_data['items'] );

		get_template_part( 'template-parts/breadcrumbs' );

	} else {

	?>

		<span><?php echo esc_attr( PageData::getArchiveToolbarLabel() ); ?></span>

	<?php } ?>

</div>
