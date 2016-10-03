(function () {

	 msrcCloudPortal = msrcCloudPortal || {}; 
	 msrcCloudPortal.Resources = msrcCloudPortal.Resources || {}; 
	 msrcCloudPortal.Resources.exceptionrequest = msrcCloudPortal.Resources.exceptionrequest || {}; 
	 msrcCloudPortal.Resources.exceptionrequest['en-us'] = msrcCloudPortal.Resources.exceptionrequest['en-us'] || {}; 
 	

	var resources = { 'columnComments': 'Comments','columnContact': 'Contact E-mail','columnStatus': 'Status','columnSubmitted': 'Submitted','columnSubscriptionGuid': 'Subscription GUID','columnTrackingNumber': 'Tracking Number','contentAssetType': 'Only Azure Virtual Machines may receive exceptions.  Azure Web Apps, Logic Apps, and other non-VM deployments cannot receive exceptions.','contentExceptionRequest1': 'Sending outbound e-mail to external domains (such as outlook.com, gmail.com, etc) directly from an e-mail server hosted in Azure compute services is not supported due to the elastic nature of public cloud service IPs and the potential for abuse.  As such, the Azure compute IP address blocks are added to public block lists (such as the Spamhaus PBL).','contentExceptionRequest2': 'Upon review, Microsoft may grant an exception to the e-mail policy.  This does not guarantee reliable e-mail delivery.  Hosting a mail server in Azure remains unsupported.  Azure Customer Service will be unable to troubleshoot e-mail delivery issues.  Uptime and SLA guarantees do not apply.','contentExceptionRequest3': 'An approved exception ensures that your IP addresses will be excluded from the opt-in blocklists that Microsoft Azure joins.','contentFollowUp': 'You will receive a follow up in 2 business days.','contentHeadingPreviousRequest': 'Previously Submitted Requests','contentHeadingRequest': 'E-mail Exception Request','contentHeadingRequirements': 'Requirements for obtaining an Azure E-mail Policy Exception','contentIPType': 'You must configure a Static, Reserved, or Instance-level IP address.  The default dynamic IP addresses received by Azure Virtual Machines cannot be used for exceptions.','contentNoRequests': 'No previously submitted requests found','contentRequirementAccountType1': 'Enterprise Agreements will receive immediate approval','contentRequirementAccountType2': 'Free Trial and MSDN subscriptions cannot receive exceptions','contentRequirementAccountType3': 'All other subscription types are subject to manual review by the security team','contentRequirementHeading1': 'Account Type:','contentRequirementHeading2': 'Asset Type:','contentRequirementHeading3': 'IP Type:','contentRequirementHeading4': 'Revocation:','contentRevocation': 'An exception will be immediately revoked upon the following circumstances','contentRevocation1': 'The VM\'s IP address is changed (the Static IP address is removed)','contentRevocation2': 'Azure Security receives multiple complaints about SPAM or other abuse originating from this IP','contentTitle': 'Azure Email Policy Exception Request','contentTrackingNumber': 'Thank you for your request.  Your tracking id is ','invalidPageNavigationError': 'Invalid page navigation attempted','labelCommaSeparated': '(Comma separated)','labelContactEmail': 'Contact E-mail:','labelExpectedVolume': 'Expected Volume:','labelIPAddresses': 'IP Addresses:','labelJustification': 'Justification:','labelMessagesPerDay': '(Messages per day)','labelSubmit': 'Submit','labelSubscriptionGuid': 'Subscription GUID:','labelVolume1': '1-100','labelVolume2': '100-1,000','labelVolume3': '1,000-100,000','labelVolume4': '100,000+','placeholderText': 'Enter Text','securityTechCenterBreadCrum': 'Security TechCenter','securityUpdatesBreadCrum': 'Security Updates','securityUpdatesCloudSecurityBreadCrum': 'Cloud Security','securityUpdatesEmailHostingBreadCrum': 'Azure Email Hosting','securityUpdatesExceptionRequestBreadCrum': 'Email Policy Exception Request','statusApproved': 'Approved','statusPending': 'Pending','statusRejected': 'Rejected' };

	msrcCloudPortal.Resources.exceptionrequest['en-us'] = resources;

})();