(function () {

	 msrcCloudPortal = msrcCloudPortal || {}; 
	 msrcCloudPortal.Resources = msrcCloudPortal.Resources || {}; 
	 msrcCloudPortal.Resources.policy = msrcCloudPortal.Resources.policy || {}; 
	 msrcCloudPortal.Resources.policy['en-us'] = msrcCloudPortal.Resources.policy['en-us'] || {}; 
 	

	var resources = { 'contentAzureEmailHosting1': 'Sending outboud e-mail to external domains (such as outlook.com, gmail.com, etc) directly from and e-mail server hosted in Azure compute services is not supported due to the elastic nature of public cloud service IPs and the potential for abuse.  As such, the Azure compute IP address blocks are added to public block lists (such as the Spamhaus PBL).','contentAzureEmailHosting2': 'This causes most e-mail providers to mark any mail sent via Azure-hosted servers as SPAM.  The only supported method for sending e-mail from Azure is to use another service outside Azure such as Exchange Online Protection, Sendgrid, or you own On-Prem e-mail server.','contentChoosing1': 'I already have an e-mail server and occasionally need my Azure application to send e-mail','contentChoosing2': 'I want to host my organization\'s e-mail server in Azure','contentChoosing3': 'I send bulk e-mail or newsletters','contentChoosing4': 'E-mail relays will not work for my purposes','contentChoosingLink1': 'Configuring your application to send authenticated e-mail','contentChoosingLink2': 'Configuring your Azure Exchange server to use an Exchange Online Protection Smart Connector','contentChoosingLink3': 'Configuring Sendgrid from your Azure application','contentChoosingLink4': 'Requesting an Azure E-mail Policy Exception','contentChoosingSee': 'See','contentHeadingChoosing': 'Choosing the Right Method for You','contentHeadingStopSpam': 'Microsoft\'s Commitment to Stop SPAM','contentStopSpam': 'Malicious users of Azure who send SPAM e-mail negatively impact all customers.  "IP Reputation" is a concept used by the operators of many security appliances which dynamically block connections that are deemed risky.  SPAM e-mail is a significant data point used when computing IP reputation.  When an IP range gets dirtied by some evildoer, it can cause neighboring legitimate customers to be blocked.','contentStopSpamLink1': 'Link 1','contentStopSpamLink2': 'Link 2','contentTitle': 'Azure Email Hosting','securityTechCenterBreadCrum': 'Security TechCenter','securityUpdatesBreadCrum': 'Security Updates','securityUpdatesCloudSecurityBreadCrum': 'Cloud Security','securityUpdatesEmailHostingBreadCrum': 'Azure Email Hosting' };

	msrcCloudPortal.Resources.policy['en-us'] = resources;

})();