import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'
 

let analytics

export const setupReporting = (name="Interface", id="G-1XT0GV0L6J") => {
	analytics = Analytics({
		app: name,
		plugins: [
			googleAnalytics({
				trackingId:id
			})
		]
	})
	
	// Track a page view 
	analytics.page()
	
	return analytics
	

	// // Track a custom event 
	// analytics.track('playedVideo', {
	// 	category: 'Videos',
	// 	label: 'Fall Campaign',
	// 	value: 42
	// })
	
	// // Identify a visitor
	// analytics.identify('user-id-xyz', {
	// 	firstName: 'bill',
	// 	lastName: 'murray'
	// })	
}

export const trackExit = () => {
	
	// // Track a custom event 
	// analytics.track('playedVideo', {
	// 	category: 'Videos',
	// 	label: 'Fall Campaign',
	// 	value: 42
	// })
}

export const trackError = error => reporter.track('Error', {
	category: 'Fails',
	label:error,
	value: 42	
})