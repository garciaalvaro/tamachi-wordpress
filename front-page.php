<?php

get_header();

if ( ! empty( get_option( 'page_on_front' ) ) ) {

	if ( have_posts() ) {

		while ( have_posts() ) {

			the_post();
		?>

		<div id="tamachi-home"><?php the_content(); ?></div>

		<?php

		}
	}

} else {

	get_template_part( 'template-parts/archive-toolbar' );

	get_template_part( 'template-parts/archive' );

}

get_footer();
