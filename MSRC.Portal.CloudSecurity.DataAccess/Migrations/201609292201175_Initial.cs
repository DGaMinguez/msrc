namespace Microsoft.MSRC.Portal.CloudSecurity.DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ExceptionRequests",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SubmittedDate = c.DateTime(nullable: false, precision: 7, storeType: "datetime2"),
                        SubscriptionId = c.Guid(nullable: false),
                        StatusId = c.Int(nullable: false),
                        ContactEmail = c.String(maxLength: 100),
                        ExpectedVolumeId = c.Int(nullable: false),
                        IPAddresses = c.String(maxLength: 500),
                        Justification = c.String(maxLength: 500),
                        Comment = c.String(maxLength: 500),
                        TrackingId = c.Guid(nullable: false),
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.VolumeRanges", t => t.ExpectedVolumeId, cascadeDelete: true)
                .ForeignKey("dbo.Status", t => t.StatusId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.StatusId)
                .Index(t => t.ExpectedVolumeId)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.VolumeRanges",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Range = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Range, unique: true);
            
            CreateTable(
                "dbo.Status",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Name = c.String(maxLength: 10),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        EmailName = c.String(maxLength: 100),
                        FullName = c.String(maxLength: 100),
                    })
                .PrimaryKey(t => t.Id);
        }

        public override void Down()
        {
            DropForeignKey("dbo.ExceptionRequests", "UserId", "dbo.Users");
            DropForeignKey("dbo.ExceptionRequests", "StatusId", "dbo.Status");
            DropForeignKey("dbo.ExceptionRequests", "ExpectedVolumeId", "dbo.VolumeRanges");
            DropIndex("dbo.Status", new[] { "Name" });
            DropIndex("dbo.VolumeRanges", new[] { "Range" });
            DropIndex("dbo.ExceptionRequests", new[] { "UserId" });
            DropIndex("dbo.ExceptionRequests", new[] { "ExpectedVolumeId" });
            DropIndex("dbo.ExceptionRequests", new[] { "StatusId" });
            DropTable("dbo.Users");
            DropTable("dbo.Status");
            DropTable("dbo.VolumeRanges");
            DropTable("dbo.ExceptionRequests");
        }
    }
}
