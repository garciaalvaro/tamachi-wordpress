<?php

namespace TAMACHI;

$items = get_query_var( 'tamachi-breadcrumbs-items' );

?>

<?php if ( ! empty( $items ) ) { ?>

	<nav class="tamachi-navigation-breadcrumbs">

		<ol>

			<?php foreach ( $items as $item ) { ?>

				<li>

					<?php if ( empty( $item['url'] ) ) { ?>

						<span><?php echo esc_attr( $item['title'] ); ?></span>

					<?php } else { ?>

						<a href="<?php echo esc_url( $item['url'] ); ?>"><?php
							echo esc_attr( $item['title'] );
						?></a>

					<?php } ?>

				</li>

			<?php } ?>

		</ol>
	</nav>

<?php } ?>
