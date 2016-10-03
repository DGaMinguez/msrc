namespace Microsoft.MSRC.Portal.CloudSecurity.DataAccess.Migrations
{
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<MsrcCloudDataContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(MsrcCloudDataContext context)
        {
            MsrcCloudDatabaseInitializer.Initialize(context);
        }
    }
}
